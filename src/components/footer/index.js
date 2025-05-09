export default function Footer({ data }) {
    return (
      <footer className="p-4 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <p>{data?.text || "footer"}</p>
        </div>
      </footer>
    );
  }