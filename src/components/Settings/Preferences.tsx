import { Moon } from 'lucide-react';
import Header from '../general/header';
import { Switch } from '../ui/switch';
import { useTheme } from '../../hooks/useTheme';

const Preferences = () => {
  const { theme, setTheme } = useTheme();

  const onCheckedChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const ListCard = () => {
    return (
      <div className="flex flex-row justify-between shadow-md w-full px-3 py-2 items-center bg-card rounded-md">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-800 rounded-md flex justify-center items-center">
            <Moon className="text-blue-500 w-6 h-6" />
          </div>
          <div className="text-container">
            <h2 className="text-base font-bold">Dark Theme</h2>
            <p className="text-sm text-gray-700">Reduce eye strain in low light</p>
          </div>
        </div>
        <Switch checked={theme === 'dark'} onCheckedChange={onCheckedChange} className="!p-0" />
      </div>
    );
  };

  return (
    <div className="px-3">
      <Header title="Preferences" description="Customize your DevConnect experience." />
      <div>
        <h2 className="text-xl font-semi-bold mb-4">Theme</h2>
        <div className="flex flex-col gap-4 w-8/10 px-3 items-center">{ListCard()}</div>
      </div>
    </div>
  );
};

export default Preferences;
