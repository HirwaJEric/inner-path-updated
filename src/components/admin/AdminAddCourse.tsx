
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const AdminAddCourse = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <BookOpen className="inline-block mr-2 h-6 w-6" /> Add New Course
          </CardTitle>
          <CardDescription>
            Fill out the form below to add a course.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Course Title</label>
              <input className="border rounded px-3 py-2 w-full" placeholder="Mindful Meditation Fundamentals" />
            </div>
            <div>
              <label className="block font-medium mb-1">Category</label>
              <input className="border rounded px-3 py-2 w-full" placeholder="Meditation" />
            </div>
            <div>
              <label className="block font-medium mb-1">Price</label>
              <input className="border rounded px-3 py-2 w-full" placeholder="Free or $99" />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Add Course</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddCourse;
