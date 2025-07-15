
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages, FileText } from "lucide-react";

interface SummaryDisplayProps {
  summary: {
    english: string;
    urdu: string;
    title: string;
  };
}

const SummaryDisplay = ({ summary }: SummaryDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground">{summary.title}</h2>
        <p className="text-muted-foreground">Generated Summary</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* English Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              English Summary
              <Badge variant="secondary">EN</Badge>
            </CardTitle>
            <CardDescription>
              AI-generated summary in English
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {summary.english}
            </p>
          </CardContent>
        </Card>

        {/* Urdu Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Languages className="h-5 w-5" />
              Urdu Translation
              <Badge variant="secondary">اردو</Badge>
            </CardTitle>
            <CardDescription>
              Translated summary in Urdu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed text-right" dir="rtl">
              {summary.urdu}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Storage Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Storage Status</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Summary saved to Supabase
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Full text saved to MongoDB
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryDisplay;
