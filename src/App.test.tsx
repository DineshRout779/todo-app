import { describe, expect, test } from 'vitest';
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// describe ==> group tests
// test ==> individual test

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should clear the input field after adding a task', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  test('should not add an empty task', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, ' ');
    await user.click(button);

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });

  test('should add a task by pressing the enter key', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });

    await user.type(input, 'New Task{enter}');

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(1);
    });
  });

  test('should edit task when edit button is clicked', async () => {
    render(<App />);

    // Add a task at first
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const addButton = screen.getByRole('button', { name: 'Add' });
    await userEvent.type(input, 'Task to be edited');
    await userEvent.click(addButton);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    await userEvent.click(editButton);

    // wait for edit input to render
    await waitFor(async () => {
      const editInput = screen.getByRole('textbox', { name: 'editInput' });
      expect(editInput).toBeInTheDocument();

      // when input has rendered ==> type on the input and save
      await userEvent.clear(editInput);
      await userEvent.type(editInput, 'Edited Task');
      const saveButton = screen.getByRole('button', { name: 'Save' });
      await userEvent.click(saveButton);

      // check if the task is updated
      await waitFor(() => {
        expect(screen.getByText('Edited Task')).toBeInTheDocument();
      });
    });
  });

  test('should delete task when delete button is clicked', async () => {
    render(<App />);

    // Add a task
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const addButton = screen.getByRole('button', { name: 'Add' });
    await userEvent.type(input, 'Task to be deleted');
    await userEvent.click(addButton);

    // Delete the task
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    await userEvent.click(deleteButton);

    // Assert the task is deleted
    await waitFor(() => {
      expect(screen.queryByText('Task to be deleted')).not.toBeInTheDocument();
    });
  });
});
