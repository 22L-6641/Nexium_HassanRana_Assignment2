
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
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {summary.title}
        </h2>
        <p className="text-lg text-muted-foreground">Generated Summary & Translation</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* English Summary */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <FileText className="h-6 w-6" />
              English Summary
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">EN</Badge>
            </CardTitle>
            <CardDescription className="text-blue-100">
              AI-powered summary extraction
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed text-lg">
                {summary.english}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Urdu Summary */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Languages className="h-6 w-6" />
              Urdu Translation
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">اردو</Badge>
            </CardTitle>
            <CardDescription className="text-purple-100">
              Intelligent dictionary-based translation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed text-lg text-right font-urdu" dir="rtl">
                {summary.urdu}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryDisplay;
