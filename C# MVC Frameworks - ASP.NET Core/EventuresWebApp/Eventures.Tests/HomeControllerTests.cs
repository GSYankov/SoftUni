using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Eventures.Tests
{
    public class HomeControllerTests
    {
        [Fact]
        public void IndexView_ShouldRenderContainer()
        {
            var driver = new ChromeDriver(".");
            driver.Navigate().GoToUrl("https://localhost:44361");
            driver.Manage().Window.Minimize();
            var container = driver.FindElement(By.ClassName("nav-link-blue"));
            container.ShouldNotBeNull();
        }
    }
}
