import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import React from "react";

type FeatureCardProps = {
    title: string;
    description: string;
    link: string;
    linkText: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function FeatureCard({
    title,
    description,
    link,
    linkText,
    Icon
}: FeatureCardProps) {
    return (
        <Card className="justify-between">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to={link}>
              <Button className="w-full">{linkText}</Button>
            </Link>
          </CardContent>
        </Card>
    );
}
