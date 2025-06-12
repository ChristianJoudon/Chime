import { Service } from '../../../types/service'

export function DatesHeader({ selectedService }: { selectedService: Service }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-mint-700 mb-2">
        {selectedService.name.includes('Free')
          ? 'Schedule Your Free Consult'
          : `Pick a Date for ${selectedService.name.split(' (')[0]}`}
      </h1>
      <p className="text-gray-700">
        Use the color-coded calendar below to see how busy each day is.
        <span className="mx-1 text-mint-600 font-semibold">Green</span>=Free,
        <span className="mx-1 text-yellow-500 font-semibold">Yellow</span>=Few slots,
        <span className="mx-1 text-pink-300 font-semibold">Pink</span>=Almost Sold Out.
      </p>
      <p className="mt-1 text-sm text-gray-500 italic">
        ⚙️ Need help ordering hardware? Go back to Services and click “Order Starlink Now.”
      </p>
    </div>
  )
}
