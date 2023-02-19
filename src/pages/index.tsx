import clsx from "clsx";

function HomePage() {
  return (
    <div
      className={clsx(
        "container h-screen w-full",
        "flex items-center justify-center"
      )}
    >
      <h1>Hello World!</h1>
    </div>
  );
}

export default HomePage;
