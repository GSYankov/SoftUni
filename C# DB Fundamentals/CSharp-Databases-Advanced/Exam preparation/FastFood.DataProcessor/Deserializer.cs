using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using FastFood.Data;
using FastFood.DataProcessor.Dto.Import;
using FastFood.Models;
using Newtonsoft.Json;

namespace FastFood.DataProcessor
{
    public static class Deserializer
    {
        private const string FailureMessage = "Invalid data format.";
        private const string SuccessMessage = "Record {0} successfully imported.";

        public static string ImportEmployees(FastFoodDbContext context, string jsonString)
        {
            List<Employee> employees = new List<Employee>();

            StringBuilder sb = new StringBuilder();

            var deserializedEmployees = JsonConvert.DeserializeObject<EmployeeDto[]>(jsonString);

            foreach (var employeeDto in deserializedEmployees)
            {
                if (!IsValid(employeeDto))
                {
                    sb.AppendLine(FailureMessage);
                    continue;
                }

                Position position = GetPosition(context, employeeDto.Position);

                Employee employee = new Employee
                {
                    Name = employeeDto.Name,
                    Age = employeeDto.Age,
                    Position = position
                };

                employees.Add(employee);
                sb.AppendLine(string.Format(SuccessMessage, employee.Name));
            }

            context.Employees.AddRange(employees);
            context.SaveChanges();

            return sb.ToString().Trim();
        }



        public static string ImportItems(FastFoodDbContext context, string jsonString)
        {
            List<Item> items = new List<Item>();

            StringBuilder sb = new StringBuilder();

            var deserializedItems = JsonConvert.DeserializeObject<ItemDto[]>(jsonString);

            foreach (var itemDto in deserializedItems)
            {
                bool isExists = items.Any(i => i.Name == itemDto.Name);

                if (!IsValid(itemDto) || isExists)
                {
                    sb.AppendLine(FailureMessage);
                    continue;
                }

                Category category = GetCategory(context, itemDto.Category);

                Item item = new Item
                {
                    Name = itemDto.Name,
                    Category = category,
                    Price = itemDto.Price
                };

                items.Add(item);
                sb.AppendLine(string.Format(SuccessMessage, item.Name));
            }

            context.Items.AddRange(items);
            context.SaveChanges();
            return sb.ToString().Trim();
        }



        public static string ImportOrders(FastFoodDbContext context, string xmlString)
        {
            StringBuilder sb = new StringBuilder();
            var serializer = new XmlSerializer(typeof(OrderDto[]), new XmlRootAttribute("Orders"));

            var deserializedOrders = (OrderDto[])serializer.Deserialize(new StringReader(xmlString));

            List<OrderItem> orderItems = new List<OrderItem>();
            List<Order> orders = new List<Order>();

            foreach (var orderDto in deserializedOrders)
            {
                bool isValidItem = true;

                if (!IsValid(orderDto))
                {
                    sb.AppendLine(FailureMessage);
                    continue;
                }

                foreach (var orderItemDto in orderDto.orderItemsDtos)
                {
                    if (!IsValid(orderItemDto))
                    {
                        isValidItem = false;
                        break;
                    }
                }

                if (!isValidItem)
                {
                    sb.AppendLine(FailureMessage);
                    continue;
                }

                var employee = context.Employees.FirstOrDefault(e => e.Name == orderDto.Employee);

                if (employee == null)
                {
                    sb.AppendLine(FailureMessage);
                    continue;
                }

                var areValidItems = AreValidItems(context, orderDto.orderItemsDtos);

                if (!areValidItems)
                {
                    sb.AppendLine(FailureMessage);
                    continue;
                }

                var date = DateTime.ParseExact(orderDto.DateTime, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
                var orderType = Enum.Parse<OrderType>(orderDto.Type);

                var order = new Order
                {
                    Customer = orderDto.Customer,
                    Employee = employee,
                    DateTime = date,
                    Type = orderType
                };
                orders.Add(order);

                foreach (var itemDto in orderDto.orderItemsDtos)
                {
                    var item = context.Items.FirstOrDefault(i => i.Name == itemDto.Name);
                    var orderItem = new OrderItem
                    {
                        Order = order,
                        Item = item,
                        Quantity = itemDto.Quantity
                    };

                    orderItems.Add(orderItem);
                }

                sb.AppendLine($"Order for {orderDto.Customer} on {date.ToString("dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture)} added");
            }

            context.Orders.AddRange(orders);
            context.SaveChanges();
            context.OrderItems.AddRange(orderItems);
            context.SaveChanges();
            return sb.ToString().Trim();
        }

        private static bool AreValidItems(FastFoodDbContext context, OrderItemsDto[] orderItemsDtos)
        {
            foreach (var item in orderItemsDtos)
            {
                bool isItemExists = context.Items.Any(oi => oi.Name == item.Name);
                if (!isItemExists)
                {
                    return false;
                }
            }

            return true;
        }

        private static Category GetCategory(FastFoodDbContext context, string categoryName)
        {
            Category category = context.Categories.FirstOrDefault(c => c.Name == categoryName);

            if (category != null)
            {
                return category;
            }

            category = new Category { Name = categoryName };
            context.Categories.Add(category);
            context.SaveChanges();
            return category;
        }

        private static Position GetPosition(FastFoodDbContext context, string positionName)
        {
            Position position = context.Positions.FirstOrDefault(p => p.Name == positionName);

            if (position != null)
            {
                return position;
            }

            position = new Position { Name = positionName };
            context.Positions.Add(position);
            context.SaveChanges();
            return position;
        }

        private static bool IsValid(object obj)
        {
            var validationContext = new ValidationContext(obj);
            var validationResults = new List<ValidationResult>();

            return Validator.TryValidateObject(obj, validationContext, validationResults, true);
        }
    }
}