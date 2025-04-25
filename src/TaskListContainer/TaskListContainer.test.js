import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskListContainer from './TaskListContainer';
import "@testing-library/jest-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clear } from '@testing-library/user-event/dist/clear';
import { addTask } from '../Redux/taskAction';

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("./TaskList/TaskList", () => () => (
  <div data-testid='task-list-mock'>Task List</div>
));

describe("Test du composant TaskListContainer ...", () => {

  beforeEach(() => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({tasks: [
      {
        "id":0,
        "createDate": "23/04/2025",
        "title": "Première tache",
        "done": false,
        "detail": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      }
    ]});
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  // Test la présence du composant dans le dom
  test('should_render_TaskListContainer_OK', () => {
    render(<TaskListContainer/>);
    expect(
      screen.getByPlaceholderText("titre de ma tâche")
    ).toBeInTheDocument();
  });

  // Test l'affichage du message d'erreur lorsqu'un titre de plus de 20 cara est saisi
  test('should_render_errorTexte_when_Tittle_bigger_than_20', () => {
    render(<TaskListContainer/>);
    const titleInput = screen.getByPlaceholderText("titre de ma tâche");
    // WHEN
    fireEvent.change(titleInput, {target : {value : "Tache Test est un titre beaucoup"}});
    fireEvent.change(titleInput, {target : {value : "Tache Test est un titre beaucoup beaucoup trop long"}});
    // THEN
    expect(screen.getByText("Titre trop long")).toBeVisible();
  });

  // Test l'envoi et la validation du formulaire d'ajout de tache
  test('should_validate_form_addTask', async () => {
    render(<TaskListContainer/>);
    const dispatch = useDispatch();
    const titleInput = screen.getByPlaceholderText("titre de ma tâche");
    const descriptionInput = screen.getByPlaceholderText("Description de ma tâche");
    const submitButton = screen.getByRole('button', {
      name: /ajouter une tache/i,
    });
    // WHEN
    fireEvent.change(titleInput, {target : {value : "Test - Titre de ma tache"}});
    fireEvent.change(descriptionInput, {target : {value : "Test - Description de la tâche en détail ..."}});
    fireEvent.click(submitButton);
    // THEN
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(
        addTask({
          "id": NaN,
          "createDate": "25/04/2025",
          "title": "Test - Titre de ma tache",
          "done": false,
          "detail": "Test - Description de la tâche en détail ..."
        })
      );
    })
  });

})


