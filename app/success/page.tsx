export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
      <div className="text-center p-8 border-4 border-red-600">
        <h1 className="text-4xl font-black mb-4">Message Sent!</h1>
        <p className="text-xl text-gray-300">Check the Netlify dashboard for submissions.</p>
        <p className="text-sm mt-4">If nothing appears, Netlify didn't detect your form.</p>
      </div>
    </div>
  );
}
