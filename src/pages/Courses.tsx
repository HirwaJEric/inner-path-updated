import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Clock, Star, Users, CheckCircle } from "lucide-react";
import { courses } from "@/data/courses";

const categories = [
  "All Categories",
  "Mindfulness",
  "Personal Growth",
  "Career",
  "Relationships",
  "Mental Health",
  "Spirituality"
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;

    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const featuredCourses = courses.filter(course => course.featured);

  return (
    <Layout>
      <Helmet>
        <title>Online Courses | InnerPath Journey</title>
        <meta name="description" content="Explore our transformative online courses on mindfulness, emotional intelligence, career growth, and more. Start your journey today." />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <SectionHeader
          title="Transform Your Life with Our Courses"
          subtitle="Explore self-paced learning experiences designed to help you grow personally and professionally"
          centered
        />

        {featuredCourses.length > 0 && (
          <div className="mt-12 mb-16">
            <h3 className="text-2xl font-bold mb-6">Featured Courses</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <Link to={`/courses/${course.slug}`} key={course.id} className="group">
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {course.sale && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          Sale
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {course.category}
                        </Badge>
                        <div className="flex items-center text-amber-500">
                          <Star className="h-3 w-3 fill-amber-500" />
                          <span className="text-sm ml-1">{course.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {course.modules} modules
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
                      <div className="font-bold">
                        {course.sale ? (
                          <div className="flex items-center gap-2">
                            <span className="text-primary">${course.salePrice}</span>
                            <span className="text-muted-foreground line-through text-sm">${course.price}</span>
                          </div>
                        ) : (
                          <span>${course.price}</span>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students.toLocaleString()} students
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-muted/30 rounded-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <select
                className="bg-background border border-input rounded-md h-10 px-3 py-2 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                className="bg-background border border-input rounded-md h-10 px-3 py-2 text-sm"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredCourses.map(course => (
            <Link to={`/courses/${course.slug}`} key={course.id} className="group">
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {course.sale && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Sale
                    </div>
                  )}
                  {course.popular && !course.sale && (
                    <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {course.category}
                    </Badge>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <span className="text-sm ml-1">{course.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.modules} modules
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1" />
                    </div>
                  )}
                </CardContent>

                <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
                  <div className="font-bold">
                    {course.sale ? (
                      <div className="flex items-center gap-2">
                        <span className="text-primary">${course.salePrice}</span>
                        <span className="text-muted-foreground line-through text-sm">${course.price}</span>
                      </div>
                    ) : (
                      <span>${course.price}</span>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedLevel("All Levels");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}

        <div className="mt-24 mb-10 max-w-4xl mx-auto">
          <SectionHeader
            title="Why Choose Our Courses"
            subtitle="Our courses are designed with your transformation in mind"
            centered
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground text-sm">
                Learn from certified professionals with real-world experience and a passion for teaching.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Practical Approach</h3>
              <p className="text-muted-foreground text-sm">
                Our courses focus on applicable techniques you can implement immediately in your life.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lifetime Access</h3>
              <p className="text-muted-foreground text-sm">
                Once enrolled, enjoy unlimited access to course materials and all future updates.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Begin Your Transformation?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Take the first step on your journey to personal growth and development. Browse our courses, find what resonates with you, and start today.
          </p>
          <Button size="lg" asChild>
            <a href="#top">Explore All Courses</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
