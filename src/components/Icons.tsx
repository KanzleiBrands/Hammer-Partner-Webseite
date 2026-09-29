import {
  Euro, Gift, Palmtree, Clock, House, Bike, Car, HeartPulse, GraduationCap,
  ShieldCheck, Users, PartyPopper, CreditCard, Star, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  euro: Euro, gift: Gift, palm: Palmtree, clock: Clock, home: House, bike: Bike,
  car: Car, heart: HeartPulse, graduation: GraduationCap, shield: ShieldCheck,
  users: Users, party: PartyPopper, card: CreditCard, star: Star,
};

export function BenefitIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Star;
  return <Icon className={className} strokeWidth={1.6} />;
}
