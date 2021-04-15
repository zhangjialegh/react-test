import { render,fireEvent, screen } from '@testing-library/react';
import HiddenMessage from './views/HiddenMessage'



test('shows the children when checkbox is checked',() => {
  const testMessage = 'Test Message'
  render(<HiddenMessage>{testMessage}</HiddenMessage>);
  expect(screen.queryByText(testMessage)).toBeNull();

  fireEvent.click(screen.getByLabelText(/show/i))

  expect(screen.getByText(testMessage)).toBeInTheDocument()
})

