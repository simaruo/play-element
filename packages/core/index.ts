import {createInstaller} from '@play-element/utils'
import components  from './components'
import "@play-element/theme/index.css"


const installer =  createInstaller(components)

export * from '@play-element/components'
export default installer