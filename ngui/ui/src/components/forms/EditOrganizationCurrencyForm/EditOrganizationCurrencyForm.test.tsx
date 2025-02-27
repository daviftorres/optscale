import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import EditOrganizationCurrencyForm from "./EditOrganizationCurrencyForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <EditOrganizationCurrencyForm defaultCurrency="USD" onSubmit={vi.fn} onCancel={vi.fn} />
    </TestProvider>
  );
  root.unmount();
});
