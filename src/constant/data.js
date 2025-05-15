import { BriefcaseBusiness, Building, Search } from "lucide-react";

export const menuItems = [
    { id: 1, href: "/", label: "Vakansiyalar",  icon: <Search />},
    { id: 2, href: "/companies", label: "Şirkətlər", icon: <Building /> },
    { id: 3, href: "/categories", label: "Kateqoriyalar", icon: <BriefcaseBusiness /> },
]

export const types = [
    {
        value: "Full-time", title: "Tam ştat"
    },
    {
        value: "Part-time", title: "Yarım-ştat"
    },
    {
        value: "Freelance", title: "Frilans"
    },
    {
        value: "Intern", title: "Təcrubə"
    },
    {
        value: "Remote", title: "Uzaqdan"
    },
    {
        value: "Temporary", title: "Müvəqqəti iş"
    },
];

export const educations = [
    {
        value: "High", title: "Ali"
    },
    {
        value: "Partial high", title: "Natamam ali"
    },
    {
        value: "Medium", title: "Orta"
    },
];

export const experiences = [
    {
        value: "No experience", title: "Təcrubəsiz"
    },
    {
        value: "1-3 years", title: "1 ildən 3 ilə qədər"
    },
    {
        value: "3-5 years", title: "3 ildən 5 ilə qədər"
    },
    {
        value: "5+ years", title: "5 ildən yüksək"
    },
];

export const expiresAt = [
    {
        _id: 1, value: "10", title: "10 gün",
    },
    {
        _id: 2, value: "20", title: "20 gün",
    },
    {
        _id: 3, value: "30", title: "30 gün",
    },
    {
        _id: 4, value: "60", title: "60 gün",
    }
];