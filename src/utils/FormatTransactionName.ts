export default function formatName(name: string) {
    return name.length > 10 ? name.slice(0, 10) + "..." : name    
}