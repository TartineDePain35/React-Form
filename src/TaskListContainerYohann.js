import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskListContainer from "./TaskListContainer";
import "@testing-library/jest-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../Redux/taskActions";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("./TaskList/TaskList", () => () => (
  <div data-testid="task-list-mock">TaskList component</div>
));

describe("TaskListContainer Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({
      tasks: [
        {
          id: 1,
          title: "test",
          done: false,
        },
      ],
    });
  });

  test("le composant est rendu correctement", () => {
    render(<TaskListContainer />);

    expect(
      screen.getByPlaceholderText("titre de la tâche")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Description de la tâche")
    ).toBeInTheDocument();
    expect(screen.getByText("Ajouter une tâche")).toBeInTheDocument();
    expect(screen.getByText("Ma Task List:")).toBeInTheDocument();
    expect(screen.getByTestId("task-list-mock")).toBeInTheDocument();
  });

  test("la message d'erreur doit apparaitre quand le titre fait + que 3 caractères", async () => {
    render(<TaskListContainer />);

    const titleInput = screen.getByPlaceholderText("titre de la tâche");

    fireEvent.change(titleInput, { target: { value: "T" } });
    fireEvent.change(titleInput, { target: { value: "Tache Test" } });

    fireEvent.blur(titleInput);

    const descriptionInput = screen.getByPlaceholderText(
      "Description de la tâche"
    );
    fireEvent.change(descriptionInput, { target: { value: "test" } });

    const errorMessage = screen.getByText("erreur de titre");

    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("L'ajout d'une tache fonctionne", async () => {
    render(<TaskListContainer />);

    const titleInput = screen.getByPlaceholderText("titre de la tâche");
    const descriptionInput = screen.getByPlaceholderText(
      "Description de la tâche"
    );
    const submitButton = screen.getByRole("button", {
      name: /ajouter une tâche/i,
    });

    fireEvent.change(titleInput, { target: { value: "titre test" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description de test" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        addTask({
          id: NaN,
          title: "titre test",
          done: false,
        })
      );
    });
  });
});
