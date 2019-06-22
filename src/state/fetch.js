import { createFetchModule } from "utils"

export default createFetchModule([
  {
    storeName: "user",
  },
  { storeName: "projects" },
])
