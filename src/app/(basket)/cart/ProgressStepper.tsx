export default function ProgressStepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex w-full max-w-4xl mx-auto mb-8 justify-between text-xs border-b border-gray-200 pb-2">
      {["Cart", "Delivery", "Payment", "Confirmation"].map((lbl, i) => (
        <li key={lbl} className="flex-1 flex flex-col items-center">
          <div className={`w-6 h-6 flex items-center justify-center font-bold text-white ${i <= currentStep ? "bg-yellow-400" : "bg-gray-300"}`}>
            {i < currentStep ? "✓" : i + 1}
          </div>
          <span className={`mt-2 ${i <= currentStep ? "text-black" : "text-gray-400"}`}>{lbl}</span>
        </li>
      ))}
    </ol>
  )
}
