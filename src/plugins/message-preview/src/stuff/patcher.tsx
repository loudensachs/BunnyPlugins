import { findByProps } from '@vendetta/metro'
import { ReactNative as RN } from '@vendetta/metro/common'
import { after, before } from '@vendetta/patcher'
import { findInReactTree } from '@vendetta/utils'

import intlProxy from '$/lib/intlProxy'

import { vstorage } from '..'
import PreviewButton from '../components/PreviewButton'
import openPreview from './openPreview'

const { ChatInput } = findByProps('ChatInput')

export const patches = new Array<any>()

export default () => {
    patches.push(
        after('render', ChatInput.prototype, (_, ret) => {
            const props = findInReactTree(
                ret.props.children,
                x => x.type?.name === 'ChatInput',
            )?.props
            if (!props?.onChangeText) return

            const children = findInReactTree(
                ret.props.children,
                x =>
                    x.type?.displayName === 'View' &&
                    Array.isArray(x.props?.children),
            )?.props?.children
            if (!children) return

            if (vstorage.buttonType === 'pill')
                children.unshift(<PreviewButton inputProps={props} />)
        }),
    )

    // thank you rosie
    patches.push(
        // @ts-expect-error not in RN typings
        before('render', RN.Pressable.type, ([a]) => {
            if (a?.accessibilityLabel === intlProxy.SEND)
                a.onLongPress = () =>
                    vstorage.buttonType === 'send' && openPreview()
        }),
    )

    return () => {
        for (const x of patches) x()
    }
}
