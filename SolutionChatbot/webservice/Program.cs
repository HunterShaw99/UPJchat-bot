using Microsoft.EntityFrameworkCore;
using website.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<QuestionContext>(opt =>
    opt.UseSqlServer(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\hunte\OneDrive\Documents\College\Junior Year 2\Software Engineering\final\upjchatbot\SolutionChatbot\webservice\DataBase\ChatBotStorage.mdf;Integrated Security=True"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var myCorsPolicy = "MyCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(myCorsPolicy,
        builder =>
        {
            builder.AllowAnyOrigin();
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(myCorsPolicy);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
