import Expense from './component/Expense/Expense.tsx';
import NavBar from './component/NavBar.tsx';

function App() {
    return (
        <div className="flex">
            <NavBar />
            <Expense />
        </div>
    );
}
export default App;
