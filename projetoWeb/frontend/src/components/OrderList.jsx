import { useState, useEffect } from 'react';
import { orderService } from '../services/api';

const styles = {
  sectionTitle: { fontSize: 20, fontWeight: 700, marginBottom: 12 },
  controls: { display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' },
  select: {
    border: '1px solid #d1d5db',
    borderRadius: 4,
    padding: '8px 10px',
    background: '#fff'
  },
  input: {
    border: '1px solid #d1d5db',
    borderRadius: 4,
    padding: '8px 10px',
    background: '#fff'
  },
  list: { display: 'grid', gap: 12 },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: 16,
    cursor: 'pointer',
    transition: 'background 0.15s ease'
  },
  cardHover: {
    background: '#f9fafb'
  },
  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  price: { fontWeight: 700 },
  subRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    color: '#6b7280'
  },
  error: { color: '#dc2626' }
};

export function OrderList({ onSelectOrder }) {
  const [orders, setOrders] = useState([]);
  const [hoverId, setHoverId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    loadOrders();
    console.log(orders)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.listOrders(filters);
      setOrders(data);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div>
      <h3 style={styles.sectionTitle}>Pedidos</h3>

      <div style={styles.controls}>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          style={styles.select}
        >
          <option value="">Todos os Status</option>
          <option value="pending_payment">Aguardando Pagamento</option>
          <option value="paid">Pago</option>
          <option value="processing">Em Processamento</option>
          <option value="shipped">Enviado</option>
          <option value="delivered">Entregue</option>
          <option value="cancelled">Cancelado</option>
        </select>

        <input
          type="date"
          name="start_date"
          value={filters.start_date}
          onChange={handleFilterChange}
          style={styles.input}
        />

        <input
          type="date"
          name="end_date"
          value={filters.end_date}
          onChange={handleFilterChange}
          style={styles.input}
        />
      </div>

      <div style={styles.list}>
        {orders.map(order => (
          <div
            key={order.id}
            style={{ ...styles.card, ...(hoverId === order.id ? styles.cardHover : null) }}
            onMouseEnter={() => setHoverId(order.id)}
            onMouseLeave={() => setHoverId(null)}
            onClick={() => onSelectOrder(order.id)}
          >
            <div style={styles.rowBetween}>
              <span>Pedido #{order.id}</span>
              <span style={styles.price}>
                R$ {typeof order.total_amount === 'number' ? order.total_amount.toFixed(2) : '0.00'}
              </span>            </div>
            <div style={styles.subRow}>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
              <span style={{ textTransform: 'capitalize' }}>{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}