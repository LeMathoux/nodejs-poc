import { resolve, relative, isAbsolute, sep } from 'node:path';
import { readdir } from 'node:fs/promises';

export function resolveInside(root: string, userPath: string): string | null {
    if (userPath.replace(/[\\/]+/g, '') === '') return null;

    if (isAbsolute(userPath)) return null;

    if (userPath.includes('\0')) return null;

    const absRoot = resolve(root);
    const target = resolve(absRoot, userPath);

    const rel = relative(absRoot, target);
    const escapes =
        rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel);

    return escapes ? null : target;
}

export async function listFiles(root: string, userPath: string): Promise<string[]> {
    const dir = resolveInside(root, userPath);
    if (dir === null) return [];

    try {
        return await readdir(dir);
    } catch {
        return [];
    }
}