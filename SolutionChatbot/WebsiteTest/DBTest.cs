using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace WebsiteTest
{
    [TestClass]
    public class DBTest
    {
        HttpClient client = new HttpClient();
        

        [TestMethod]
        public void TestGet()
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://localhost:7115/api/QuestionModels");
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                Console.Write(reader.ReadToEnd());
            }
        }

        [TestMethod]
        public void TestPut()
        {
            using (var client = new HttpClient(new HttpClientHandler { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate }))
            {
                client.BaseAddress = new Uri("https://localhost:7115/api/");
                HttpResponseMessage response = client.GetAsync("QuestionModels/1").Result;
                response.EnsureSuccessStatusCode();
                string result = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine("Result: " + result);
            }
        }

        [TestMethod]
        public void TestDelete()
        {
            using (var client = new HttpClient(new HttpClientHandler { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate }))
            {
                client.BaseAddress = new Uri("https://localhost:7115/api/");
                HttpResponseMessage response = client.DeleteAsync("QuestionModels/1").Result;
                response.EnsureSuccessStatusCode();
                string result = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine("Result: " + result);
            }
        }
    }
}