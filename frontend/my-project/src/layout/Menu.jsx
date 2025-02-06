import {
    ChartPieIcon
} from '@heroicons/react/24/outline'

const solutions = [
    { name: 'Beranda', href: '/Home', icon: ChartPieIcon },
    { name: 'Berita', href: '/News', icon: ChartPieIcon },
    { name: 'FAQ', href: '/Faq', icon: ChartPieIcon },

]

export default function Example() {
    return (
        <div className="w-[50%]  absolute right-0 rounded-3xl bg-white text-sm/6 shadow-lg">
            <div className="p-1 items-center">
                {solutions.map((item) => (
                    <div key={item.name} className="group items-center relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50">
                        <div className="mt-1 flex size-10 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                        </div>
                        <div>
                            <a href={item.href} className="font-semibold text-gray-900">
                                {item.name}
                                <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
