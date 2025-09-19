// // src/lib/toastConfirm.ts
// import { toast } from "sonner";

// export function toastConfirm(
//   message: string,
//   onConfirm: () => void,
//   options?: {
//     confirmText?: string;
//     cancelText?: string;
//     duration?: number;
//   }
// ) {
//   const { confirmText = "Confirm", cancelText = "Cancel", duration = 5000 } = options || {};

//   const id = toast(message, {
//     duration,
//     action: {
//       label: confirmText,
//       onClick: () => {
//         onConfirm();
//         toast.dismiss(id);
//       },
//     },
//   });

//   // Optional: Append Cancel button next to Confirm
//   setTimeout(() => {
//     const toastEl = document.querySelector(`[data-sonner-toast-id="${id}"]`);
//     const btn = toastEl?.querySelector("button");
//     if (btn && toastEl) {
//       const cancelBtn = document.createElement("button");
//       cancelBtn.textContent = cancelText;
//       cancelBtn.className = "ml-2 text-sm text-muted-foreground hover:text-foreground";
//       cancelBtn.onclick = () => toast.dismiss(id);
//       btn.parentElement?.appendChild(cancelBtn);
//     }
//   }, 100);
// }



// // src/lib/toastConfirm.tsx
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button"; // Adjust this path to your button component
// import { cn } from "@/lib/utils"; // If you use `cn()` utility for Tailwind

// type ToastConfirmOptions = {
//   confirmText?: string;
//   cancelText?: string;
//   description?: string;
//   onConfirm: () => void;
//   onCancel?: () => void;
// };

// export function toastConfirm(
//   message: string,
//   {
//     confirmText = "Confirm",
//     cancelText = "Cancel",
//     description,
//     onConfirm,
//     onCancel,
//   }: ToastConfirmOptions
// ) {
//   toast.custom((id) => (
//     <div
//       className={cn(
//         "w-full max-w-md p-4 rounded-xl shadow-xl border",
//         "bg-white/80 backdrop-blur-md",
//         "border-white text-white",
//         "flex flex-col gap-3"
//       )}
//     >
//       <div className="font-semibold text-foreground">{message}</div>
//       {description && (
//         <div className="text-sm text-muted-foreground">{description}</div>
//       )}
//       <div className="flex justify-end gap-2 pt-2">
//         <Button
//           variant="rejectButton"
//           size="sm"
//           onClick={() => {
//             toast.dismiss(id);
//             onCancel?.();
//           }}
//         >
//           {cancelText}
//         </Button>
//         <Button
//           variant="confirmButton"
//           size="sm"
//           onClick={() => {
//             toast.dismiss(id);
//             onConfirm();
//           }}
//         >
//           {confirmText}
//         </Button>
//       </div>
//     </div>
//   ));
// }


// src/lib/toastConfirm.tsx
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToastConfirmOptions = {
  confirmText?: string;
  cancelText?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function toastConfirm(
  message: string,
  {
    confirmText = "Confirm",
    cancelText = "Cancel",
    description,
    onConfirm,
    onCancel,
  }: ToastConfirmOptions
) {
  toast.custom(
    (id) => (
      <div
        className={cn(
          "w-full max-w-md p-4 rounded-xl shadow-xl border ",
          "bg-white/80 backdrop-blur-md",
          "border-white text-white",
          "flex flex-col gap-3"
        )}
      >
        <div className="font-semibold text-foreground">{message}</div>
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="rejectButton"
            size="sm"
            onClick={() => {
              toast.dismiss(id);
              onCancel?.();
            }}
          >
            {cancelText}
          </Button>
          <Button
            variant="confirmButton"
            size="sm"
            onClick={() => {
              toast.dismiss(id);
              onConfirm();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    ),
    {
      duration: 8000, // ✅ Toast lasts for 8 seconds
    }
  );
}
