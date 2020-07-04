using AngularJsDemonstration_2.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularJsDemonstration_2.Controllers
{
    public class EmployeeApiController : ApiController
    {
        public List<Employee> GetAll()
        {
            SqlConnection conn = new SqlConnection(@"server=HP-UTPAL;database=EmployeeDB;integrated security=true");
            string query = "select * from EmpInfo";
            SqlCommand cmd = new SqlCommand(query, conn);
            List<Employee> empList = new List<Employee>();
            conn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                Employee emp = new Employee
                {
                    Id = (int)dr[0],
                    Name = dr[1].ToString(),
                    Location = dr[2].ToString(),
                    Salary = (int)dr[3],
                    DeptId = (int)dr[4]
                };

                empList.Add(emp);
            }

            conn.Close();

            return empList;
        }

        public Employee GetById(int Id)
        {
            SqlConnection conn = new SqlConnection(@"server=HP-UTPAL;database=EmployeeDB;integrated security=true");
            string query = "select * from EmpInfo where Id=" + Id;
            SqlCommand cmd = new SqlCommand(query, conn);
            Employee emp = null;
            conn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            if (dr.Read())
            {
                emp = new Employee
                {
                    Id = (int)dr[0],
                    Name = dr[1].ToString(),
                    Location = dr[2].ToString(),
                    Salary = (int)dr[3],
                    DeptId = (int)dr[4]
                };

            }

            conn.Close();

            return emp;
        }

        public bool DeleteEmployee(int Id)
        {
            SqlConnection conn = new SqlConnection(@"server=HP-UTPAL;database=EmployeeDB;integrated security=true");
            string query = "delete from EmpInfo where Id=@Id";
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.Add(new SqlParameter("@Id", Id));
            conn.Open();
            int noOfRowAffected = cmd.ExecuteNonQuery();
            conn.Close();
            return noOfRowAffected > 0 ? true : false;
        }

        public bool Put(Employee emp)
        {
            SqlConnection conn = new SqlConnection(@"server=HP-UTPAL;database=EmployeeDB;integrated security=true");
            string query = "update EmpInfo set Name=@Name,Location=@Loc,Salary=@Sal,DepartmentId=@dId where Id=@Id";
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.Add(new SqlParameter("@Id", emp.Id));
            cmd.Parameters.Add(new SqlParameter("@Name", emp.Name));
            cmd.Parameters.Add(new SqlParameter("@Loc", emp.Location));
            cmd.Parameters.Add(new SqlParameter("@Sal", emp.Salary));
            cmd.Parameters.Add(new SqlParameter("@dId", emp.DeptId));
            conn.Open();
            int noOfRowAffected = cmd.ExecuteNonQuery();
            conn.Close();
            return noOfRowAffected > 0 ? true : false;
        }
    }
}
