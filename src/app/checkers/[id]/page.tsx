
export default function Play({ params }: Readonly<{ params: { id: number } }>) {
    return (
        <div>{params.id}</div>
    );
}
