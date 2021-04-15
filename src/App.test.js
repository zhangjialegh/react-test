import { render,fireEvent, screen } from '@testing-library/react';

import {rest} from 'msw'
import {setupServer} from 'msw/node'
import App from './App';
import Login from './views/Login'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders src/App.js link', () => {
  render(<App />);
  const linkElement = screen.getByText(/src\/App.js/i);
  expect(linkElement).toBeInTheDocument();
});


const fakeUserResponse = {token: 'fake_user_token'}
const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.json(fakeUserResponse))
  }),
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  window.localStorage.removeItem('token')
})
afterAll(() => server.close())



test('allows the user to login successfully', async() => {
  render(<Login/>)
  fireEvent.change(screen.getByLabelText(/username/i),{
    target:{value:'chuck'}
  })
  fireEvent.change(screen.getByLabelText(/password/i),{
    target:{value:'norris'}
  })
  fireEvent.click(screen.getByText(/submit/i))

  const alert = await screen.findByRole('alert')

  expect(alert).toHaveTextContent(/congrats/i)
  expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token)
})