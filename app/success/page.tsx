export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
      <div className="text-center p-8 border-4 border-red-600">
        <h1 className="text-4xl font-black mb-4">Message Sent!</h1>
        <p className="text-xl text-gray-300">
          Thanks for reaching out. We'll get back to you shortly.
        </p>
      </div>
    </div>
  );
}
