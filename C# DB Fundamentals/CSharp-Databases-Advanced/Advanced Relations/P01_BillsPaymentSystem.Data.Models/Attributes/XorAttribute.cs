using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace P01_BillsPaymentSystem.Data.Models.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class XorAttribute : ValidationAttribute
    {
        private string _xorTargetAttribute;

        public XorAttribute(string xorTargetAttribute)
        {
            this._xorTargetAttribute = xorTargetAttribute;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var targetAttribute = validationContext.ObjectType
                                                   .GetProperty(_xorTargetAttribute)
                                                   .GetValue(validationContext.ObjectInstance);

            if ((targetAttribute == null && value != null) || (targetAttribute != null && value == null))
            {
                return ValidationResult.Success;
            }

            string _errMsg = "The both values must be opposite!";

            return new ValidationResult(_errMsg);
        }
    }
}





