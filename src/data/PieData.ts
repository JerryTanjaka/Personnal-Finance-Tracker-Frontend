export async function getExpenses() {
    try {
        const token = localStorage.getItem('accessToken');
        console.log(token)
        const response = await fetch("http://localhost:3000/api/expenses", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Affiche les données reçues
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        throw error; // re-throw the error so the component can catch it
    }
}