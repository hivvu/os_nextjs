export default function Footer({ config }) {
  // console.log(JSON.stringify(config, null, 2));

  return (
    <footer className="p-4 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto">
        <h1>Footer</h1>
        <p>{config?.strings?.account?.welcome_back}</p>
      </div>
    </footer>
  );
}