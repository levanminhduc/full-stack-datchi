import { TodoPage } from '../features/todos';
import { useTheme } from './providers';

function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  return <TodoPage darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
}

export default App;

