using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace P01_HospitalDatabase.Data.Migrations
{
    public partial class PatMed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Visitations",
                type: "DATETIME2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Medicaments",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Diagnoses",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 50,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Visitations",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Medicaments",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Diagnoses",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50);
        }
    }
}
