
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { courses } from "@/data/courses";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const CourseAnalytics = () => {
  // Simulated data - in a real app, this would come from your backend
  const courseStats = courses.map(course => ({
    name: course.title,
    students: Math.floor(Math.random() * 1000),
    completion: Math.floor(Math.random() * 100),
    revenue: Math.floor(Math.random() * 10000)
  }));

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Course Performance Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#8884d8" name="Enrolled Students" />
              <Bar dataKey="completion" fill="#82ca9d" name="Completion Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Enrolled Students</TableHead>
              <TableHead>Completion Rate</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseStats.map((stat) => (
              <TableRow key={stat.name}>
                <TableCell>{stat.name}</TableCell>
                <TableCell>{stat.students}</TableCell>
                <TableCell>{stat.completion}%</TableCell>
                <TableCell className="text-right">${stat.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
