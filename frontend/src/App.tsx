import { useQuery } from "@tanstack/react-query";
import { checkHealth } from "./services/checkHealth";

const App = () => {
  const { isPending, isError, error } = useQuery({
    queryKey: ["apiHealth"],
    queryFn: checkHealth,
  });

  if (isPending) return <h1>Connecting to the server...</h1>;

  if (isError) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h1>Musatori</h1>
    </div>
  );
};

export default App;
