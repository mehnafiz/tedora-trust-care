
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { Send, PaperclipIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const { isClient, user } = useRoleCheck();
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      role: "agent",
      name: "TEDora Support",
      message: "Hello! How can I help you today?",
      time: "10:00 AM"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage = {
      id: Date.now(),
      role: "user",
      name: user?.user_metadata?.name || "You",
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage("");

    // Simulate response (in real app, this would come from a backend)
    setTimeout(() => {
      const responseMessage = {
        id: Date.now() + 1,
        role: "agent",
        name: "TEDora Support",
        message: isClient 
          ? "Thank you for your message. Our team will respond shortly. Is there anything else you need help with?" 
          : "Thank you for your message. A coordinator will respond to your query soon.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleFileUpload = () => {
    toast({
      title: "Upload Feature",
      description: "File upload functionality will be available soon.",
    });
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-200px)] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {chatMessages.map(chat => (
            <div 
              key={chat.id}
              className={`flex mb-4 ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${
                  chat.role === 'user'
                    ? 'bg-tedora-sage/90 text-white rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-lg'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-lg'
                } p-3 shadow-sm`}
              >
                <div className="flex items-center mb-1">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className={`${
                        chat.role === 'user' ? 'bg-white text-tedora-sage' : 'bg-tedora-sage/20 text-tedora-sage'
                      }`}>
                        {chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`text-xs font-medium ${chat.role === 'user' ? 'text-white/90' : 'text-gray-600'}`}>
                      {chat.name}
                    </span>
                  </div>
                  <span className={`ml-2 text-xs ${chat.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="whitespace-pre-wrap">{chat.message}</div>
              </div>
            </div>
          ))}
        </div>
        
        <Card className="border-t">
          <CardContent className="py-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Button 
                type="button" 
                size="icon" 
                variant="outline" 
                className="rounded-full"
                onClick={handleFileUpload}
              >
                <PaperclipIcon className="h-5 w-5" />
              </Button>
              <Input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1"
              />
              <Button type="submit" className="bg-tedora-sage hover:bg-tedora-sage/90">
                <Send className="h-5 w-5 mr-2" />
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
