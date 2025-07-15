
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Globe, Languages, Database } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SummaryDisplay from "@/components/SummaryDisplay";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<{
    english: string;
    urdu: string;
    title: string;
  } | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid blog URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate the blog processing
      // In real implementation, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock summary for demonstration
      const mockSummary = {
        english: "This is a simulated summary of the blog post. The main points include innovative approaches to technology, user experience design, and practical implementation strategies.",
        urdu: "یہ بلاگ پوسٹ کا نقلی خلاصہ ہے۔ اہم نکات میں ٹیکنالوجی کے جدید طریقے، صارف تجربہ ڈیزائن، اور عملی نفاذ کی حکمت عملیاں شامل ہیں۔",
        title: "Blog Summary"
      };
      
      setSummary(mockSummary);
      
      toast({
        title: "Success",
        description: "Blog summarized and translated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Blog Summariser</h1>
          <p className="text-muted-foreground text-lg">
            Enter a blog URL to get an AI-powered summary in English and Urdu
          </p>
        </div>

        {/* Main Input Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Blog URL Input
            </CardTitle>
            <CardDescription>
              Paste the URL of the blog post you want to summarize
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Blog URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/blog-post"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button 
              onClick={handleSummarize} 
              disabled={isLoading || !url}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Summarize Blog"}
            </Button>
          </CardContent>
        </Card>

        {/* Backend Requirements Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Backend Integration Required:</strong> To enable web scraping and database storage, 
            please connect to Supabase using the green button in the top right. This will allow creating 
            Edge Functions for scraping and storing data.
          </AlertDescription>
        </Alert>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Web Scraping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Extract blog content from any URL using automated scraping
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Languages className="h-4 w-4" />
                Translation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automatic translation to Urdu using JavaScript dictionary
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="h-4 w-4" />
                Dual Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Save summaries in Supabase and full text in MongoDB
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Summary Display */}
        {summary && (
          <>
            <Separator />
            <SummaryDisplay summary={summary} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
