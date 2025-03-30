
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ConnectionStatus } from "../hooks/useChatbot";

interface ConnectionStatusDisplayProps {
  status: ConnectionStatus;
  onRetry: () => void;
}

export const ConnectionStatusDisplay: React.FC<ConnectionStatusDisplayProps> = ({ 
  status, 
  onRetry 
}) => {
  switch (status) {
    case "connected":
      return (
        <span className="flex items-center">
          <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
          Connected
        </span>
      );
    case "connecting":
      return (
        <span className="flex items-center">
          <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
          Connecting...
        </span>
      );
    case "failed":
      return (
        <div className="flex items-center">
          <span className="flex items-center">
            <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
            Connection failed
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onRetry}
            className="ml-2 h-6 text-xs text-mediseva-100 hover:text-white hover:bg-mediseva-500"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        </div>
      );
    default:
      return null;
  }
};
