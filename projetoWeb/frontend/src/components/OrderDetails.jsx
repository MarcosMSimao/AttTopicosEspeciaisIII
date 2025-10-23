import { useState, useEffect } from 'react';
import { orderService } from '../services/api';

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    zIndex: 50
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    width: '100%',
    maxWidth: 720,
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 700
  },
  closeBtn: {
    border: 'none',
    background: 'transparent',
    color: '#6b7280',
    fontSize: 20,
    cursor: 'pointer'
  },
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    fontWeight: 700,
    marginBottom: 8
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  select: {
    border: '1px solid #d1d5db',
    borderRadius: 4,
    padding: '6px 8px',
    background: '#fff',
    cursor: 'pointer'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 8,
    marginBottom: 8
  },
  itemSub: {
    fontSize: 12,
    color: '#6b7280'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 700,
    paddingTop: 12,
    borderTop: '1px solid #e5e7eb'
  },
  error: {
    color: '#dc2626'
  }
};

export function OrderDetails({ orderId, onClose }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrderDetails(orderId);
      setOrder(data);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      await orderService.updateOrderStatus(orderId, newStatus);
      await loadOrderDetails();
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={styles.error}>{error}</div>;
  if (!order) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>Pedido #{order.id}</h3>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div>
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Status</h4>
            <div style={styles.row}>
              <span style={{ textTransform: 'capitalize' }}>{order.status}</span>
              {!updating && (
                <select
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  style={styles.select}
                  value={order.status}
                >
                  <option value="pending_payment">Aguardando Pagamento</option>
                  <option value="paid">Pago</option>
                  <option value="processing">Em Processamento</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              )}
            </div>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Revendedor</h4>
            <p>
              {order.reseller.name} ({order.reseller.email})
            </p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Endereço de Entrega</h4>
            <p>
              {order.shipping_address.street}, {order.shipping_address.number}
              <br />
              {order.shipping_address.city} - {order.shipping_address.state}
              <br />
              CEP: {order.shipping_address.zip_code}
            </p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Itens do Pedido</h4>
            <div>
              {order.items.map(item => (
                <div key={item.product_id} style={styles.itemRow}>
                  <div>
                    <div>{item.name}</div>
                    <div style={styles.itemSub}>
                      {item.quantity}x R$ {item.unit_price.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700 }}>
                    R$ {item.subtotal.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.totalRow}>
            <span>Total</span>
            <span>R$ {order.total_amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}