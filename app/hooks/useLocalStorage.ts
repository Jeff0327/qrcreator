// hooks/useLocalStorage.ts
import { useState, useEffect, useRef } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    // 초기 렌더링 여부를 추적하는 ref
    const isFirstRender = useRef(true);

    // 로컬 스토리지에서 초기값을 로드하는 함수
    const getInitialValue = () => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    // State 초기화 - 함수를 사용하여 초기 렌더링 시에만 실행되도록 함
    const [storedValue, setStoredValue] = useState<T>(getInitialValue);

    // 값이 변경될 때 로컬 스토리지 업데이트
    useEffect(() => {
        // 첫 번째 렌더링이면 업데이트 건너뛰기
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    // 값을 설정하는 함수
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // 함수인 경우 현재 값을 인자로 전달
            const valueToStore =
                typeof value === 'function'
                    ? (value as (val: T) => T)(storedValue)
                    : value;

            // 상태 업데이트
            setStoredValue(valueToStore);
        } catch (error) {
            console.error(`Error updating value for localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;