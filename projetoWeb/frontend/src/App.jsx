import { useState } from 'react';
import { OrderForm } from './components/OrderForm';
import { OrderList } from './components/OrderList';
import { OrderDetails } from './components/OrderDetails';

const styles = {
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: 16,
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    color: '#111827'
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 24
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 24
  },
  gridMd: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24
  }
};

function App() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOrderCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Responsivo simples: usa 2 colunas acima de 768px
  const isTwoCols = typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Pedidos</h1>

      <div style={isTwoCols ? styles.gridMd : styles.grid}>
        <OrderForm onOrderCreated={handleOrderCreated} />
        <OrderList
          key={refreshKey}
          onSelectOrder={setSelectedOrderId}
        />
      </div>

      {selectedOrderId && (
        <OrderDetails
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}

export default App;