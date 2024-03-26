import Cake from "@modules/common/icons/cake"
import Deliver from "@modules/common/icons/deliver"
import Timer from "@modules/common/icons/timer"

const policies = [
  {
    name: "Free 1h Click & Collect",
    icon: Timer,
    description:
      "Selected Cupcakes and Cakes can be ordered by 3pm the day before desired delivery. All other items must be ordered with 2 days notice before 3pm.",
  },
  {
    name: "Next day delivery",
    icon: Deliver,
    description:
      "Selected Cupcakes and Cakes can be ordered by 3pm the day before desired delivery. All other items must be ordered with 2 days notice before 3pm.",
  },
  {
    name: "Freshly made in store",
    icon: Cake,
    description:
      "Selected Cupcakes and Cakes can be ordered by 3pm the day before desired delivery. All other items must be ordered with 2 days notice before 3pm.",
  },
]

export default function Policies() {
  return (
    <section id="policies" className="relative bg-primary-75">
      <div className="hidden lg:block absolute inset-x-0 top-0 bg-primary-50 h-[calc(76%+2px)]"></div>
      <div className="bg-policy-pattern bg-cover lg:bg-curve bg-no-repeat bg-bottom lg:h-[450px] pb-10 lg:pb-0 ">
        <div className="max-w-7xl relative z-[100] mx-auto flex justify-center items-center py-10 ">
          <div className="grid xl:w-4/5 grid-cols-3 place-items-center items-start gap-x-5 lg:gap-10 lg:px-5">
            {policies.map((policy, idx) => (
              <div
                className="flex flex-col items-center px-0 md:px-5 lg:px-0"
                key={idx}
              >
                <span className="text-primary-700 ">
                  <policy.icon size={56} />
                </span>
                <h3 className="text-center text-primary-900 text-xs font-medium lg:text-xl capitalize mt-2 lg:font-bold whitespace-pre-wrap font-WildMango">
                  {policy.name}
                </h3>
                <p className="hidden md:block text-primary-900 text-center mt-2 text-xs lg:text-xs font-normal">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="absolute z-[80] top-0 inset-x-0 min-h-[602px] bg-policy-pattern bg-center bg-cover" /> */}
    </section>
  )
}
