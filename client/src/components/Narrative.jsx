export default function Narrative({ campaign }) {
  return (
    <div>
      <div className="narrative">
        {campaign.narrative.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic' }}>
            La aventura está por comenzar...
          </p>
        ) : (
          campaign.narrative.map((entry, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              {entry.type === 'dm-narrative' && (
                <div>
                  <p>{entry.content}</p>
                </div>
              )}
              {entry.type === 'dm-response' && (
                <div>
                  <p>{entry.content}</p>
                </div>
              )}
              {entry.type === 'player-action' && (
                <div style={{ borderLeft: '2px solid #666', paddingLeft: '10px', color: '#aaa', fontSize: '14px' }}>
                  <strong style={{ color: '#e8c547' }}>{entry.player}:</strong> {entry.action}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
