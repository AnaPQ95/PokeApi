export default function Tipos ({pokeTipos}) {
    return (
        <div className="main__carta--divTipos">
            {pokeTipos.map((e) => (
                <div key={e.type.name} className="main__carta--tipo">{(e.type.name).toUpperCase()}</div>
            ))}
        </div>
    )
}