import { Request, Response, NextFunction } from 'express';
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkillByName,
  updateSkill,
} from '../../services/admin/skill.service';

export const createSkillHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const skillName: string = req.body?.name;
    const newSkill = await createSkill({
      name: skillName.toLowerCase(),
    });
    res
      .status(201)
      .json({ message: 'Skill created successfuly', data: newSkill });
  } catch (error) {
    next(error);
  }
};

export const updateSkillHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  const data = req.body;
  try {
    if (!id) {
      res.status(403).json({ message: 'skill id is required.' });
    }

    const updatedSkill = await updateSkill(Number(id), data);

    res.status(201).json({
      message: 'Skill updated successfully',
      data: updatedSkill,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkillHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(403).json({ message: 'Skill id is required.' });
    }

    const deletedSkill = await deleteSkill(Number(id));

    res.status(201).json({
      message: 'Skill deleted successfully',
      industry: deletedSkill,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSkillsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, pageSize, search } = req.query;
  try {
    const skills = await getAllSkills({
      page: Number(page ?? 1),
      pageSize: Number(pageSize ?? 10),
      search: search as string,
    });
    res.status(200).json({
      message: 'Successfuly got all skills',
      data: skills?.data,
      pagination: skills?.pagination,
    });
  } catch (error) {
    next(error);
  }
};
