import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DiscountWarningModalProps {
    open: boolean;
    onClose: () => void;
    onProceed: () => void;      // continue to next page
  messages: string[];
}


export const DiscountWarningModal = ({ open, onClose, onProceed,  messages }: DiscountWarningModalProps) => {
    
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:w-[600px]  sm:w-[500px] w-[290px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="lg:text-2xl sm:text-xl text-lg font-bold text-white bg-dGreen sm:py-4 py-3 flex  justify-center rounded-t-lg">
            Important Reminder
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center px-10 max-h-500px] overflow-y-auto">
          <ul className="list-disc pl-5 space-y-8 py-4">
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
          <div className="flex justify-center mt-6 gap-3 w-full">
            <Button 
                onClick={onClose} 
                variant="prevButton">
              Cancel
            </Button>

            <Button 
                onClick={onProceed} 
                variant="confirmButton">
              Proceed Anyway
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
