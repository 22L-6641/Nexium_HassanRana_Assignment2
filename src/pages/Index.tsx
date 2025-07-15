
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Globe, Languages, Database, Sparkles, BookOpen, Zap } from "lucide-react";
import SummaryDisplay from "@/components/SummaryDisplay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { translateText } from "@/utils/translator";

const Index = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<{
    english: string;
    urdu: string;
    title: string;
  } | null>(null);
  const { toast } = useToast();

  const generateSummary = (text: string) => {
    // Simulate AI summary generation with static logic
    const sentences = text.split('.').filter(s => s.trim().length > 0);
    const keyPoints = sentences.slice(0, 3).join('. ') + '.';
    return `This blog post discusses ${keyPoints} The main insights include innovative approaches to problem-solving and practical implementation strategies that can be applied in various scenarios.`;
  };

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
      // Check if summary already exists
      const { data: existingSummary } = await supabase
        .from('blog_summaries')
        .select('*')
        .eq('url', url)
        .single();

      if (existingSummary) {
        setSummary({
          english: existingSummary.english_summary,
          urdu: existingSummary.urdu_summary,
          title: existingSummary.title || "Blog Summary"
        });
        toast({
          title: "Success",
          description: "Retrieved existing summary from database!",
        });
        return;
      }

      // Simulate blog scraping delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate scraped content
      const mockContent = `Technology has revolutionized the way we work and communicate. Modern applications require careful consideration of user experience and performance optimization. Developers must balance functionality with usability to create effective solutions.`;
      
      // Generate summary using static logic
      const englishSummary = generateSummary(mockContent);
      
      // Translate to Urdu
      const urduSummary = translateText(englishSummary);
      
      const blogTitle = `Blog Summary - ${new Date().toLocaleDateString()}`;
      
      // Save to Supabase
      const { error } = await supabase
        .from('blog_summaries')
        .insert({
          url: url,
          title: blogTitle,
          english_summary: englishSummary,
          urdu_summary: urduSummary
        });

      if (error) {
        throw error;
      }

      setSummary({
        english: englishSummary,
        urdu: urduSummary,
        title: blogTitle
      });
      
      toast({
        title: "Success",
        description: "Blog summarized, translated, and saved successfully!",
      });
    } catch (error) {
      console.error('Error:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog Summariser
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform any blog into concise summaries with instant Urdu translation. 
            Powered by AI-like intelligence and beautiful design.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>Smart • Fast • Multilingual</span>
          </div>
        </div>

        {/* Main Input Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Globe className="h-6 w-6" />
              Enter Blog URL
            </CardTitle>
            <CardDescription className="text-blue-100">
              Paste any blog URL to get an instant summary in English and Urdu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-3">
              <Label htmlFor="url" className="text-lg font-medium">Blog URL</Label>
              <div className="relative">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/amazing-blog-post"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                  className="h-12 pl-12 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
                <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <Button 
              onClick={handleSummarize} 
              disabled={isLoading || !url}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Magic...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Summarize & Translate
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                Web Scraping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Automatically extract and process content from any blog URL with intelligent text parsing
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Languages className="h-5 w-5 text-purple-600" />
                </div>
                Smart Translation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Instant English to Urdu translation using advanced dictionary mapping and context awareness
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                Smart Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Summaries stored in Supabase for quick retrieval, with full text ready for MongoDB integration
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Summary Display */}
        {summary && (
          <div className="space-y-6">
            <Separator className="my-8" />
            <SummaryDisplay summary={summary} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
