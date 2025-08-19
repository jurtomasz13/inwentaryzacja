import { ClipboardList, MapPin, Package, ShoppingCart, Tag } from "lucide-react";
import { FeatureCard } from "../components/feature-card";

export function HomePage() {
    return (
        <>
            <h1 className="text-3xl font-bold">System Inwentaryzacji Sklepu</h1>
            <p className="text-xl mt-2 mb-6 font-semibold">Zarządzaj produktami, pomieszczeniami i inwentaryzacjami w swoim sklepie</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard title="Produkty" Icon={Package} description="Zarządzaj katalogiem produktów i kodami" link="/products" linkText="Zarządzaj produktami" />
                <FeatureCard title="Pomieszczenia" Icon={MapPin} description="Definiuj pomieszczenia magazynowe" link="/rooms" linkText="Zarządzaj pomieszczeniami" />
                <FeatureCard title="Inwentaryzacje" Icon={ClipboardList} description="Twórz i zarządzaj inwentaryzacjami" link="/inventory" linkText="Inwentaryzacje" />
                <FeatureCard title="Zamówienia" Icon={ShoppingCart} description="Rejestruj sprzedaż i zamówienia" link="/orders" linkText="Zarządzaj zamówieniami" />
                <FeatureCard title="Kategorie" Icon={Tag} description="Zarządzaj kategoriami produktów" link="/categories" linkText="Zarządzaj kategoriami" />
            </div>
        </>
    )
}

export default HomePage;
